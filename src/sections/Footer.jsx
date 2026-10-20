export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '2rem 1rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-faint)', fontFamily: 'monospace', fontSize: '0.8rem' }}>
      © {new Date().getFullYear()} Taro · built with React + Vite
    </footer>
  );
}