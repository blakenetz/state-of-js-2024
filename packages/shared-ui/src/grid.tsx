import React from "react";

export default function Grid({ children }: React.PropsWithChildren) {
  return (
    <section className="mx-auto max-w-2xl p-4 lg:max-w-7xl lg:p-8">
      <h2 className="mb-2">Pokemon</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {children}
      </div>
    </section>
  );
}
