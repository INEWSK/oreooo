import { LOCALES } from "@/shared/constants";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: [...LOCALES],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(zh-hant|en|ja)/:path*"],
};
