export function highlightWidget(element: HTMLElement) {
  element.classList.add("widget-highlight");
  window.setTimeout(() => element.classList.remove("widget-highlight"), 1400);
}

export function scrollToWidget(
  targetId: string,
  options: { inline?: ScrollLogicalPosition; block?: ScrollLogicalPosition } = {}
) {
  const element = document.getElementById(targetId);
  if (!element) return false;

  const main = document.querySelector<HTMLElement>(".workspace-main");
  const block = options.block ?? "nearest";
  const inline = options.inline ?? "nearest";

  if (main) {
    const mainRect = main.getBoundingClientRect();
    const elRect = element.getBoundingClientRect();
    const delta = elRect.top - mainRect.top - 16;

    if (Math.abs(delta) > 8) {
      main.scrollBy({ top: delta, behavior: "smooth" });
    }
  }

  element.scrollIntoView({ behavior: "smooth", block, inline });
  highlightWidget(element);
  return true;
}
