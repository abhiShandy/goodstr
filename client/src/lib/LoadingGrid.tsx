import "./LoadingGrid.css";

export const LoadingGrid = ({ centered }: { centered: boolean }) => {
  return (
    <div className={centered ? "text-center mt-20" : ""}>
      <div className={"lds-grid"}>
        <div></div>
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
};
