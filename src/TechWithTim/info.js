export function Info() {
  const title = "This is my title!";
  const showTitle = true;
  const value = false;

  return (
    <div>
      <h1>{showTitle ? title : ""}</h1>
      <p>Manage your stuff.</p>
    </div>
  );
}
