import css from "./layout.module.css";

type Props = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
};

const CatalogLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.sidebar}>{sidebar}</div>
        <div className={css.content}>{children}</div>
      </div>
    </section>
  );
};

export default CatalogLayout;
