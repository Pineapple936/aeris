import createNextIntlPlugin from "next-intl/plugin";
// @ts-expect-error - no types for next-pwa
import withPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin();

export default withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
})(withNextIntl());
