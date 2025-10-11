import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ========== Types ==========

export interface IArticle {
  id: number;
  title: string;
  category: string;
  tags: string[];
  cover: string;
  published: boolean;
  scheduled: Date | null;
  richText: any;
  localUrl: string;
  views: number;
}

type ArticlesState = {
  articlesByUser: Record<string, IArticle[]>;
  currentUserId: string | null;
};

type ArticlesActions = {
  setCurrentUser: (userId: string | number) => void;
  getAllArticles: () => IArticle[];
  deleteArticle: (articleId: number) => void;
  createArticle: (body: Omit<IArticle, "id">) => void;
  updateArticle: (articleId: number, body: IArticle) => void;
  updateArticles: (articles: IArticle[]) => void;
  getArticleBy: (articleId: number) => IArticle | null;
};

type ArticlesStore = ArticlesState & ArticlesActions;

// ========== Helper Functions ==========

const handleDeleteArticle = (articles: IArticle[], id: number): IArticle[] =>
  articles.filter((article) => article.id != id);

const handleUpdateArticle = (
  articles: IArticle[],
  id: number,
  updated: IArticle
): IArticle[] =>
  articles.map((article) => (article.id == id ? updated : article));

const handleGetArticle = (id: number, articles: IArticle[]): IArticle | null =>
  articles.find((article) => article.id == id) ?? null;

const handleCreateArticle = (
  articles: IArticle[],
  newArticle: Omit<IArticle, "id">
): IArticle[] => {
  const newId = (articles[articles.length - 1]?.id || 0) + 1;
  const views = Math.floor(Math.random() * 2000); // Generate random number of views

  return [...articles, { ...newArticle, id: newId, views }];
};

// ========== Zustand Store ==========

export const useArticles = create<ArticlesStore>()(
  persist(
    (set, get) => ({
      articlesByUser: {},
      currentUserId: null,
      getAllArticles: () => {
        const userId = get().currentUserId;
        if (!userId) return [];
        return get().articlesByUser[userId] || [];
      },

      setCurrentUser: (userId) =>
        set((state) => ({
          currentUserId: userId?.toString(),
          articlesByUser: {
            ...state.articlesByUser,
            [userId]: state.articlesByUser[userId] ? state.articlesByUser[userId] : [], // Intilize user articles with empty array
          },
        })),

      updateArticles: (articles) => {
        const userId = get().currentUserId;
        if (!userId) return;
        set((state) => ({
          articlesByUser: {
            ...state.articlesByUser,
            [userId]: articles,
          },
        }));
      },

      getArticleBy: (id) => {
        const userId = get().currentUserId;
        
        if (!userId) return null;
        const articles = get().articlesByUser[userId] || [];
        
        return handleGetArticle(id, articles);
      },

      deleteArticle: (id) => {
        const userId = get().currentUserId;
        if (!userId) return;
        set((state) => {
          const userArticles = state.articlesByUser[userId] || [];
          return {
            articlesByUser: {
              ...state.articlesByUser,
              [userId]: handleDeleteArticle(userArticles, id),
            },
          };
        });
      },

      createArticle: (article) => {
        const userId = get().currentUserId;
        if (!userId) return;
        set((state) => {
          const userArticles = state.articlesByUser[userId] || [];
          return {
            articlesByUser: {
              ...state.articlesByUser,
              [userId]: handleCreateArticle(userArticles, article),
            },
          };
        });
      },

      updateArticle: (id, updatedArticle) => {
        const userId = get().currentUserId;
        if (!userId) return;
        set((state) => {
          const userArticles = state.articlesByUser[userId] || [];
          return {
            articlesByUser: {
              ...state.articlesByUser,
              [userId]: handleUpdateArticle(userArticles, id, updatedArticle),
            },
          };
        });
      },
    }),
    {
      name: "articles-multi-user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
