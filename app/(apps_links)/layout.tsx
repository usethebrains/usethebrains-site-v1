import { Poppins } from "next/font/google";

const inter = Poppins({weight: '500', subsets: ["latin"] });

export default function OnNavBarLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
<html>
<body className={`overflow-y-auto overflow-x-hidden ${inter.className}`}>
{children}
</body>
</html>
  )
}