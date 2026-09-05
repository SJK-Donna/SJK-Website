import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const CartCanvas = forwardRef(function CartCanvas({ initialColor }, ref) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setThemeColor: (hex) => sceneRef.current?.setThemeColor(hex),
    setAutoRotate: (on) => sceneRef.current?.setAutoRotate(on)
  }));

  useEffect(() => {
    let cancelled = false;

    import("./CartScene.js").then(({ default: CartScene }) => {
      if (cancelled) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      sceneRef.current = new CartScene(canvasRef.current, { reducedMotion, initialColor });
    });

    return () => {
      cancelled = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
});

export default CartCanvas;
