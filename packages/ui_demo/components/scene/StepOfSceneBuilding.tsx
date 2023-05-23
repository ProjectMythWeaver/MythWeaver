import Image from "next/image";
import logoIChing from "../../images/i-ching.png";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

export function StepOfSceneBuilding({
  loadingTitle,
  loading,
  bg,
  showIChingLogo,
  onGoNext,
}: {
  loadingTitle: string;
  loading: boolean;
  bg: string;
  showIChingLogo?: boolean;
  onGoNext?: () => void;
}) {
  const [loadingTail, setLoadingTail] = useState("");
  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => {
      setLoadingTail((t) => {
        if (t.length === 3) return "";
        return t + ".";
      });
    }, 300);
    return () => clearInterval(t);
  }, [loading]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${bg})`,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {showIChingLogo && (
        <div className={styles.sceneBuildingCenter}>
          <Image
            className={loading ? styles.sceneBuildingCenterLogo : ""}
            src={logoIChing}
          />
        </div>
      )}
      <div
        className={styles.sceneBuildingBanner}
        style={{ position: "absolute", bottom: 194 }}
      >
        {loadingTitle}
        {loading ? loadingTail : ""}
      </div>
    </div>
  );
}
