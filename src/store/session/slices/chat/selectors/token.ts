import { encode } from 'gpt-tokenizer';

import { agentSelectors } from '@/store/session/slices/agentConfig';

import type { SessionStore } from '../../../store';
import { currentChatsWithHistoryConfig } from './chat';

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

export const chatsTokenCount = (s: SessionStore): number => {
  return 0;
};

export const totalTokenCount = (s: SessionStore) => chatsTokenCount(s) + systemRoleTokenCount(s);
