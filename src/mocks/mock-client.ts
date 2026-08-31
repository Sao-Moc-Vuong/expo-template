import MockAdapter from "axios-mock-adapter";

import { env } from "@/configs/env.config";
import { axiosInstance } from "@/lib/api-client";
import { registerAuthMockHandlers } from "@/mocks/handlers/auth.mock";
import { registerProfileMockHandlers } from "@/mocks/handlers/profile.mock";

let installed = false;

export function setupMockApiIfEnabled(): void {
  if (!env.API_MOCK || installed) {
    return;
  }
  installed = true;

  const mock = new MockAdapter(axiosInstance, { delayResponse: 400 });
  registerAuthMockHandlers(mock);
  registerProfileMockHandlers(mock);
}
