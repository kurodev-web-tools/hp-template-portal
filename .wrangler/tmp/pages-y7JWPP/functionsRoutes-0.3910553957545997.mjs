import { onRequestPost as __api_checkout_js_onRequestPost } from "D:\\hp-portal\\functions\\api\\checkout.js"
import { onRequestPost as __api_submit_form_js_onRequestPost } from "D:\\hp-portal\\functions\\api\\submit-form.js"
import { onRequestPost as __api_webhook_js_onRequestPost } from "D:\\hp-portal\\functions\\api\\webhook.js"

export const routes = [
    {
      routePath: "/api/checkout",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_checkout_js_onRequestPost],
    },
  {
      routePath: "/api/submit-form",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_submit_form_js_onRequestPost],
    },
  {
      routePath: "/api/webhook",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_webhook_js_onRequestPost],
    },
  ]