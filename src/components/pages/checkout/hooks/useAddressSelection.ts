import { useState } from 'react';

export default function useAddressSelection(initialId?: string | null) {
  const [selectedId, setSelectedId] = useState<string | null>(initialId ?? null);

  return {
    selectedId,
    setSelectedId,
    hasSelection: !!selectedId,
  };
}
