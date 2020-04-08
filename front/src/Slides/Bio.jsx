import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";

import Slide from "./Components/Slide";

const Bio = React.forwardRef(({ ...restProps }, ref) => {
  const { t } = useTranslation(["slides"]);

  return (
    <Slide ref={ref} {...restProps}>
      <Typography variant="h2" gutterBottom>
        {t("slides:bio_title")}
      </Typography>
    </Slide>
  );
});

export default Bio;
