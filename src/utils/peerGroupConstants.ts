
export const PEER_GROUP_PERCENTILES = {
  "all": 47,
  "same-objective": 52,
  "same-state": 58,
  "same-school": 67
} as const;

export const PEER_GROUP_LABELS = {
  "all": "All AMBOSS",
  "same-objective": "Same Learning Objective",
  "same-state": "Same State",
  "same-school": "Same School"
} as const;

export type PeerGroupType = keyof typeof PEER_GROUP_PERCENTILES;
