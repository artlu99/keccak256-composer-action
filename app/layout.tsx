import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryClientProvider } from "./providers/ReactQueryClientProvider";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Keccak256 Composer Action Form",
	description: "A form to compose text as Keccak256",
	other: {
		"fc:frame": JSON.stringify({
			version: "next",
			imageUrl: "https://sassyhash.artlu.xyz/og-clean.jpg",
			button: {
				title: "Launch Frame",
				action: {
					type: "launch_frame",
					name: "SassyHash",
					url: "https://keccak256-composer-action.vercel.app/encode?nonce=0",
					splashImageUrl:
						"https://sassyhash.artlu.xyz/_astro/testimonial-bg-01.CofysqBI.webp",
					splashBackgroundColor: "#000000",
				},
			},
		}),
	},
	openGraph: {
		images: [
			{
				url: "https://sassyhash.artlu.xyz/og-clean.jpg",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ReactQueryClientProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					{children}
				</body>
			</html>
		</ReactQueryClientProvider>
	);
}
