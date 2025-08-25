import Provider from "./provider";
const FullWidthPageLayout = ({children}: {children: React.ReactNode;}) =>  {
  return (
    <Provider>
      {children}
    </Provider>
  );
}
export default FullWidthPageLayout
