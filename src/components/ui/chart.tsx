{Array.isArray(payload) &&
  payload.map((item) => {
    const key = `${nameKey || item.dataKey || "value"}`;
    return (
      <div key={key} className={className}>
        {/* render legend item */}
      </div>
    );
  })}