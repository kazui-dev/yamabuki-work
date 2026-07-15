export default function Survey() {
  return (
    <section className="max-w-md mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <iframe
          src="https://forms.office.com/pages/responsepage.aspx?id=07VbxZj7okm9Yto1xwcA4h_hM0WSLYdEt92oOdCtCyJUQzFUREVWVkhWWVI2OE5HVVROUTZHV0RaVi4u&embed=true"
          className="w-full border-0"
          style={{ height: '80vh', minHeight: '480px' }}
          allowFullScreen
        />
      </div>
    </section>
  );
};
