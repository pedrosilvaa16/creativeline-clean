interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Mantém a estrutura que o tema usa: HeaderV7 + children + FooterV4.
 * Sem dependências de “smooth-scroll”/scripts externos.
 */
const LayoutV1 = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default LayoutV1;
