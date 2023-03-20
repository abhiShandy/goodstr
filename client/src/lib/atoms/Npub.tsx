const Npub = ({ npub }: { npub: string }) => {
  const length = npub.length;
  if (length < 63) {
    return <>{"Invalid npub"}</>;
  }
  return <>{npub.substring(0, 8) + "..." + npub.substring(length - 8)}</>;
};

export default Npub;
