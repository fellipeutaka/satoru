export function formatUptime(uptime: number) {
  const seconds = uptime % 60;
  const minutes = Math.floor(uptime / 60) % 60;
  const hours = Math.floor(uptime / 3600) % 24;
  const days = Math.floor(uptime / 86400) % 7;
  const weeks = Math.floor(uptime / 604800) % 4;
  const months = Math.floor(uptime / 2592000) % 12;
  const years = Math.floor(uptime / 31536000);

  let formattedUptime = "";
  if (years > 0) {
    formattedUptime += `${years}y `;
  }
  if (months > 0) {
    formattedUptime += `${months}m `;
  }
  if (weeks > 0) {
    formattedUptime += `${weeks}w `;
  }
  if (days > 0) {
    formattedUptime += `${days}d `;
  }
  if (hours > 0) {
    formattedUptime += `${hours}h `;
  }
  if (minutes > 0) {
    formattedUptime += `${minutes}m `;
  }
  if (seconds > 0) {
    formattedUptime += `${seconds}s`;
  }

  return formattedUptime.trim();
}
