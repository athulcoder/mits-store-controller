export function formatRelativeTime(
  dateString: string
) {

  const now =
    new Date();

  const date =
    new Date(dateString);

  const diff =
    Math.floor(
      (now.getTime() -
        date.getTime()) /
      1000
    );

  if (diff < 60) {
    return "Just now";
  }

  if (diff < 3600) {
    return `${Math.floor(
      diff / 60
    )} mins ago`;
  }

  if (diff < 86400) {
    return `${Math.floor(
      diff / 3600
    )} hrs ago`;
  }

  return `${Math.floor(
    diff / 86400
  )} days ago`;
}