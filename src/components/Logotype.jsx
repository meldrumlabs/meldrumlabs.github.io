export function Logotype(props) {
  return <img src="/img/logo/wordmark.svg" alt="Meldrum Labs" {...props} className={`w-auto ${props.className ?? ''}`} />;
}
