import React, { Suspense, memo } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
/**
 *
 * @param props Take no props, just return skeleton while components load lazy
 */
function Loader(props: any) {
  const width = "98vw";
  const widthHalf = "50vw";
  const height = "50px";
  return (
    <div style={{ padding: 10 }}>
      <Skeleton
        style={{ backgroundColor: "#cacaca" }}
        variant="text"
        width={width}
        height={height}
      />
      <Skeleton variant="text" width={width} height={height} />
      <Skeleton variant="text" width={widthHalf} height={height} />
    </div>
  );
}
/**
 * It's taken react component as children and using suspense api to show fallback component
 * for lazy loading component using React.lazy https://reactjs.org/docs/code-splitting.html
 * @param props children i.e React Component
 */
const SuspenseContainer = memo(function SuspenseComponent(props: any) {
  return <Suspense fallback={<Loader />}>{props.children}</Suspense>;
});
export default SuspenseContainer;
