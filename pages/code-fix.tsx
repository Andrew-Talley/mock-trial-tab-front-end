import { useEffect } from "react";

export default () => {
  const storage = typeof sessionStorage === "undefined" ? null : sessionStorage;
  const code = parseInt(storage?.getItem("code"));

  useEffect(() => {
    storage?.removeItem("code");
    storage?.setItem("code", "1776");
  });

  return code === 1776 ? <span>Done!</span> : <span>Working...</span>;
};
