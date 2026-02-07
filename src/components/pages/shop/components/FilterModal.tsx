'use client';

import { Box, Container, Dialog, IconButton, Typography, CircularProgress } from '@mui/material';
import { useState } from 'react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import SwitchInput from '@/components/ui/SwitchInput';
import SelectFilter from '@/components/ui/filters/SelectFilter';
import RangeFilter from '@/components/ui/filters/RangeFilter';
import ColorFilter from '@/components/ui/filters/ColorFilter';
import { ProductColor } from '@/enums/colors';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import {
  CategoryPropertyFilter,
  SelectedFiltersPayload,
  ProductPropertyFilterPayload,
  AGE_RANGE_FILTER_ID,
  COLOR_FILTER_ID,
} from '../types';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  locale: string;
  translations: {
    filter: string;
    viewProducts: string;
    clearFilters: string;
    from: string;
    to: string;
    currency: string;
    cheapestPrice: string;
    mostExpensivePrice: string;
  };
  categoryFilters: CategoryPropertyFilter[];
  loadingFilters: boolean;
  filtersError: string | null;
  onApplyFilters: (filters: SelectedFiltersPayload) => Promise<void> | void;
}

interface FilterState {
  [key: string]: {
    selectedValueIds?: string[];
  };
}

export default function FilterModal({
  open,
  onClose,
  locale,
  translations,
  categoryFilters,
  loadingFilters,
  filtersError,
  onApplyFilters,
}: FilterModalProps) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filterStates, setFilterStates] = useState<FilterState>({});

  const getFilterTitle = (filter: CategoryPropertyFilter) => {
    return filter.title;
  };

  const handleFilterClick = (filterId: string) => {
    const filter = categoryFilters.find((f) => f.id === filterId);
    if (filter) {
      setSelectedFilter(filterId);
    }
  };

  const handleBack = () => {
    setSelectedFilter(null);
  };

  const handleSelectChange = (filterId: string, selectedIds: Array<string | number>) => {
    setFilterStates((prev) => ({
      ...prev,
      [filterId]: {
        ...prev[filterId],
        selectedValueIds: selectedIds.map((id) => `${id}`),
      },
    }));
  };

  const handleClearFilters = () => {
    setFilterStates({});
    setSelectedFilter(null);
  };

  const buildFilterPayload = (): SelectedFiltersPayload => {
    const getSelectedValueIds = (filterId: string) =>
      filterStates[filterId]?.selectedValueIds ?? [];

    const colorIds = getSelectedValueIds(COLOR_FILTER_ID);
    const ageRangeIds = getSelectedValueIds(AGE_RANGE_FILTER_ID);

    const propertyFilters: ProductPropertyFilterPayload[] = categoryFilters
      .filter(
        (filter) =>
          filter.id !== COLOR_FILTER_ID && filter.id !== AGE_RANGE_FILTER_ID
      )
      .map((filter) => {
        const valueIds = getSelectedValueIds(filter.id);
        if (valueIds.length === 0) {
          return null;
        }
        return {
          propertyId: filter.id,
          valueIds,
        };
      })
      .filter(
        (entry): entry is ProductPropertyFilterPayload => entry !== null
      );

    return {
      colorIds,
      ageRangeIds,
      propertyFilters,
    };
  };

  const handleViewProducts = async () => {
    await onApplyFilters(buildFilterPayload());
    setSelectedFilter(null);
    onClose();
  };

  const getTotalSelectedCount = () => {
    let count = 0;
    Object.entries(filterStates).forEach(([, state]) => {
      if (state.selectedValueIds) count += state.selectedValueIds.length;
    });
    return count;
  };

  const renderFilterContent = (filter: CategoryPropertyFilter) => {
    const state = filterStates[filter.id] || {};

    if (!filter.values?.length) {
      return (
        <Typography align="center" color="text.secondary">
          No options available for this filter.
        </Typography>
      );
    }

    return (
      <SelectFilter
        options={filter.values.map((value) => ({
          id: value.id,
          title: value.title,
        }))}
        selectedIds={state.selectedValueIds || []}
        onChange={(ids) => handleSelectChange(filter.id, ids)}
        locale={locale}
      />
    );
  };

  const renderMainView = () => (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'background.default',
          zIndex: 10,
          borderBottom: 1,
          borderColor: 'divider',
          py: 2,
        }}
      >
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">{translations.filter}</Typography>
            <IconButton onClick={onClose}>
              <HighlightOffOutlinedIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          {loadingFilters ? (
            <Box
              sx={{
                py: 4,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CircularProgress size={24} />
            </Box>
          ) : categoryFilters.length === 0 ? (
            <Box sx={{ py: 4 }}>
              <Typography
                align="center"
                color={filtersError ? 'error' : 'text.secondary'}
              >
                {filtersError ?? 'No filters available right now.'}
              </Typography>
            </Box>
          ) : (
            categoryFilters.map((filter, index) => (
              <Box key={filter.id}>
                <Box
                  onClick={() => handleFilterClick(filter.id)}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 2,
                    cursor: 'pointer',
                  }}
                >
                  <Typography>{getFilterTitle(filter)}</Typography>
                  <ChevronLeftOutlinedIcon />
                </Box>
                {index < categoryFilters.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </Container>
      </Box>
    </>
  );

  const renderDetailView = () => {
    const filter = categoryFilters.find((f) => f.id === selectedFilter);
    if (!filter) return null;

    return (
      <>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'background.default',
            zIndex: 10,
            borderBottom: 1,
            borderColor: 'divider',
            py: 2,
          }}
        >
          <Container>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconButton onClick={handleBack}>
                <EastOutlinedIcon />
              </IconButton>
              <Typography variant="h6">{getFilterTitle(filter)}</Typography>
            </Box>
          </Container>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <Container>{renderFilterContent(filter)}</Container>
        </Box>
      </>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'background.default',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        {selectedFilter === null ? renderMainView() : renderDetailView()}

        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'background.default',
            borderTop: 1,
            borderColor: 'divider',
            py: 2,
          }}
        >
          <Container>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button fullWidth radius="md" onClick={handleViewProducts}>
                {translations.viewProducts} {getTotalSelectedCount()}
              </Button>
              <Button
                variant="outline"
                fullWidth
                radius="md"
                onClick={handleClearFilters}
              >
                {translations.clearFilters}
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </Dialog>
  );
}
