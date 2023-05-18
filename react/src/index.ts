import React, { useState, useEffect } from "react";
import { css, CSSProperties } from "@stitches/core";

// Используем Map для хранения стилей по их идентификаторам.
const stylesMap = new Map<string, CSSProperties>();

type StyledHookReturnType = {
  className: string;
  selector: string;
  props: {};
};

const createStyledHook = <T extends Record<string, unknown>>(cssFunction: typeof css, cssParams: (props: T) => CSSProperties) => {
  const useStyled = (props: T): StyledHookReturnType => {
    const [ styleSignal, setStyleSignal ] = useState(() => cssFunction({})());

    useEffect(() => {
      const style = cssFunction(cssParams(props) as { [name: string]: unknown; });
      if (stylesMap.has(style.className)) {
        stylesMap.set(style.className, cssParams(props));
      } else {
        stylesMap.set(style.className, cssParams(props));
      }
      setStyleSignal(style());
    }, [props]);

    return styleSignal;
  };

  return useStyled;
};

export { createStyledHook };
