import { useEffect } from "react";

export default () => {
  const code = parseInt(sessionStorage.getItem("code"));

  useEffect(() => {
    sessionStorage.removeItem("code");
    sessionStorage.setItem("code", "1776");
  });

  return code === 1776 ? <span>Done!</span> : <span>Working...</span>;
};
