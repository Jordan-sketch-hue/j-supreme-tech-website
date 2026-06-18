/* Re-mounts on every route change → each page enters with a cinematic
   crossfade (cn-scene in cinematic.css). Server component, zero JS. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="cn-scene">{children}</div>;
}
