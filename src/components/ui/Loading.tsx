import AnimateParentScaleUp, {
  AnimateChildScaleUpChild,
} from "@/lib/Animation/AnimateParentScaleUpChild";

export default function Loading() {
  return (
    <AnimateParentScaleUp className="fixed inset-0 bg-gray-50 flex flex-col items-center justify-center space-y-3">
      <AnimateChildScaleUpChild>
        <div className="w-80 h-6 bg-gray-200 rounded animate-pulse" />
      </AnimateChildScaleUpChild>
      <AnimateChildScaleUpChild duration={0.3}>
        <div className="w-72 h-6 bg-gray-200 rounded animate-pulse" />
      </AnimateChildScaleUpChild>
      <AnimateChildScaleUpChild duration={0.6}>
        <div className="w-64 h-6 bg-gray-200 rounded animate-pulse" />
      </AnimateChildScaleUpChild>
      <AnimateChildScaleUpChild duration={0.9}>
        <div className="w-56 h-6 bg-gray-200 rounded animate-pulse" />
      </AnimateChildScaleUpChild>
    </AnimateParentScaleUp>
  );
}
