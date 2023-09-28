import { encode } from 'gpt-tokenizer';

import { agentSelectors } from '@/store/session/slices/agentConfig';

import type { SessionStore } from '../../../store';

// TODO: We should find a smaller package to do this. gpt-tokenizer has 2M Size
const count = (text: string) => encode(text).length;

export const systemRoleSel = (s: SessionStore): string => {
  const config = agentSelectors.currentAgentConfig(s);

  return config.systemRole;
};

export const systemRoleTokenCount = (s: SessionStore): number => {
  const systemRole = systemRoleSel(s);

  return count(systemRole || '');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const chatsTokenCount = (_s: SessionStore): number => {
  // Implementation of the function is removed for now
  return 0;
};

export const totalTokenCount = (s: SessionStore) => chatsTokenCount(s) + systemRoleTokenCount(s);
