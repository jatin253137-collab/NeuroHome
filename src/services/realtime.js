export function nextActivity(items, templates) {
  const template = templates[Math.floor(Math.random() * templates.length)];

  return [
    {
      ...template,
      id: crypto.randomUUID(),
      time: 'Now',
    },
    ...items.map((item) => ({
      ...item,
      time: item.time === 'Now' ? '2 min' : item.time,
    })),
  ].slice(0, 5);
}

export function nextChartPoint(index, baseUsage = 3.4) {
  const hours = (6 + index * 3) % 24;
  const time = `${hours.toString().padStart(2, '0')}:00`;

  return {
    time,
    usage: Number((baseUsage + Math.sin(index / 2) * 0.7 + Math.random() * 0.5).toFixed(1)),
    solar: Number((1.3 + Math.cos(index / 2) * 0.6 + Math.random() * 0.4).toFixed(1)),
  };
}
