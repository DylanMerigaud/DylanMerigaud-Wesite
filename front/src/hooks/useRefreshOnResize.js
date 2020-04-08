import { useEffect } from "react";
import useForceUpdate from "use-force-update";

const useRefreshOnResize = () => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    window.addEventListener("resize", forceUpdate);
    return () => {
      window.removeEventListener("resize", forceUpdate);
    };
  }, [forceUpdate]);
};

export default useRefreshOnResize;
