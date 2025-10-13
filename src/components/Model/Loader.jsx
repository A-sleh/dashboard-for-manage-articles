

export default function Loader() {
  return (
    <div
      id="loader"
      style={{
        zIndex: "100000",
        backgroundColor: "#7070707c",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        borderRadius: "8px",
        width: "100px",
        height: "100px",
        margin: "auto",
      }}
    >
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
