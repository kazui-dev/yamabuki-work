export default function Survey() {
  return (
    <section className="w-full">
      <div className="bg-white/85 dark:bg-mauve-900/85 backdrop-blur-md rounded-lg border border-mauve-200 dark:border-mauve-800 shadow-sm overflow-hidden">
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
