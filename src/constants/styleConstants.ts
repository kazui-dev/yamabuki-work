// Timetable styles
export const TIMETABLE_STYLES = {
  container: "max-w-md mx-auto space-y-8",
  itemContainer: "relative pl-6 border-l-2 border-slate-200 last:border-transparent pb-4",
  dot: "absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-slate-400 border-2 border-white z-10",
  timeContainer: "flex items-center gap-1.5 leading-none text-sm text-slate-500 font-bold mb-3",
  cardContainer: "bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden",
  cardContent: "p-5 pb-4",
  cardTitle: "text-lg font-bold text-slate-800",
  authorText: "flex items-center gap-2 leading-none text-sm text-slate-600 mt-2",
  descriptionText: "text-xs text-slate-500 mt-2",
  actionButtonContainer: "mt-4",
};

// Session styles
export const SESSION_STYLES = {
  container: "border-t border-slate-100 bg-slate-50/50",
  itemContainer: "p-5 border-b border-slate-100 last:border-transparent hover:bg-slate-50 transition-colors",
  timeContainer: "flex items-center gap-1.5 leading-none text-xs text-slate-500 font-bold mb-2",
  sessionTitle: "font-bold text-slate-800 text-sm mb-2",
  authorText: "flex items-center gap-2 leading-none text-xs text-slate-600 mb-2",
  descriptionText: "text-xs text-slate-500 mb-2",
  detailButtonContainer: "mt-3",
};

// Button styles
export const BUTTON_STYLES = {
  actionButton: "w-full bg-blue-600 hover:bg-blue-700",
  detailButton: "w-full h-8 text-xs bg-white",
  closeButton: "justify-center",
};

// Drawer styles
export const DRAWER_STYLES = {
  container: "mx-auto w-full max-w-md",
  contentArea: "p-5 overflow-y-auto max-h-[60vh]",
  contentText: "text-sm text-slate-700 whitespace-pre-wrap",
  imageContainer: "rounded-md overflow-hidden border border-slate-100 bg-slate-50 aspect-video relative mt-4",
};

// Layout styles
export const LAYOUT_STYLES = {
  body: "min-h-screen bg-slate-50 selection:bg-slate-400/30 text-slate-900 antialiased",
  main: "p-6 mb-16",
  headerContainer: "max-w-md mx-auto mb-8 text-center",
  title: "text-3xl sm:text-4xl font-extrabold mb-6",
  eventCard: "inline-flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm p-5 transition-shadow hover:shadow-md",
  eventTime: "flex items-center justify-center gap-2 text-xl font-bold mb-3",
  divider: "w-full h-px bg-slate-100 mb-3",
  eventDetails: "flex items-center justify-center gap-3 text-sm text-slate-600",
};

// Icon styles
export const ICON_STYLES = {
  small: { size: 12 },
  normal: { size: 14 },
  large: { size: 16 },
  xlarge: { size: 24 },
};

// Color styles
export const COLOR_STYLES = {
  text: {
    primary: "text-slate-900",
    secondary: "text-slate-700",
    tertiary: "text-slate-600",
    muted: "text-slate-500",
  },
  bg: {
    primary: "bg-slate-50",
    secondary: "bg-slate-100",
    tertiary: "bg-slate-200",
  },
  border: {
    light: "border-slate-100",
    normal: "border-slate-200",
  },
};
