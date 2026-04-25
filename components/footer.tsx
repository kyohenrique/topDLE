export function Footer() {
  return (
    <footer className="mt-8 border-t border-nv-gray-border py-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4">
        <a
          href="https://github.com/kyohenrique"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-nv-green"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.19-3.37-1.19-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.35 1.08 2.92.82.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.1-4.55-4.92 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .85-.27 2.78 1.02A9.7 9.7 0 0 1 12 6.84a9.7 9.7 0 0 1 2.53.34c1.92-1.29 2.77-1.02 2.77-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.33 4.67-4.56 4.91.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
          </svg>
          <span>Desenvolvido por Henrique</span>
        </a>
      </div>
    </footer>
  );
}
