'use client';

import { Box, Container, Dialog, IconButton, Typography } from '@mui/material';
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
import filtersData from '@/data/filters.json';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';

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
}

interface FilterState {
  [key: number]: {
    selectedIds?: number[];
    rangeValue?: [number, number];
    selectedColors?: ProductColor[];
    switchValue?: boolean;
  };
}

export default function FilterModal({
  open,
  onClose,
  locale,
  translations,
}: FilterModalProps) {
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
  const [filterStates, setFilterStates] = useState<FilterState>({});

  const filters = filtersData.filters;

  const getFilterTitle = (filter: any) => {
    return locale === 'fa' ? filter.titleFa : filter.titleEn;
  };

  const handleFilterClick = (filterId: number) => {
    const filter = filters.find((f) => f.id === filterId);
    if (filter?.mode !== 'SWITCH') {
      setSelectedFilter(filterId);
    }
  };

  const handleBack = () => {
    setSelectedFilter(null);
  };

  const handleSelectChange = (filterId: number, selectedIds: number[]) => {
    setFilterStates((prev) => ({
      ...prev,
      [filterId]: { ...prev[filterId], selectedIds },
    }));
  };

  const handleRangeChange = (
    filterId: number,
    rangeValue: [number, number]
  ) => {
    setFilterStates((prev) => ({
      ...prev,
      [filterId]: { ...prev[filterId], rangeValue },
    }));
  };

  const handleColorChange = (
    filterId: number,
    selectedColors: ProductColor[]
  ) => {
    setFilterStates((prev) => ({
      ...prev,
      [filterId]: { ...prev[filterId], selectedColors },
    }));
  };

  const handleSwitchChange = (filterId: number, checked: boolean) => {
    setFilterStates((prev) => ({
      ...prev,
      [filterId]: { ...prev[filterId], switchValue: checked },
    }));
  };

  const handleClearFilters = () => {
    setFilterStates({});
    setSelectedFilter(null);
  };

  const getTotalSelectedCount = () => {
    let count = 0;
    Object.entries(filterStates).forEach(([, state]) => {
      if (state.selectedIds) count += state.selectedIds.length;
      if (state.selectedColors) count += state.selectedColors.length;
      if (state.switchValue) count += 1;
    });
    return count;
  };

  const renderFilterContent = (filter: any) => {
    const state = filterStates[filter.id] || {};

    switch (filter.mode) {
      case 'SELECT':
        return (
          <SelectFilter
            options={filter.options}
            selectedIds={state.selectedIds || []}
            onChange={(ids) => handleSelectChange(filter.id, ids)}
            locale={locale}
          />
        );
      case 'RANGE':
        return (
          <RangeFilter
            min={filter.min}
            max={filter.max}
            value={state.rangeValue || [filter.min, filter.max]}
            onChange={(value) => handleRangeChange(filter.id, value)}
            fromLabel={translations.from}
            toLabel={translations.to}
            currencyLabel={translations.currency}
            minLabel={translations.cheapestPrice}
            maxLabel={translations.mostExpensivePrice}
          />
        );
      case 'COLOR':
        return (
          <ColorFilter
            selectedColors={state.selectedColors || []}
            onChange={(colors) => handleColorChange(filter.id, colors)}
            locale={locale}
          />
        );
      default:
        return null;
    }
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
          {filters.map((filter, index) => (
            <Box key={filter.id}>
              {filter.mode === 'SWITCH' ? (
                <Box sx={{ py: 2 }}>
                  <SwitchInput
                    checked={filterStates[filter.id]?.switchValue || false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSwitchChange(filter.id, e.target.checked)
                    }
                    label={getFilterTitle(filter)}
                  />
                </Box>
              ) : (
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
              )}
              {index < filters.length - 1 && <Divider />}
            </Box>
          ))}
        </Container>
      </Box>
    </>
  );

  const renderDetailView = () => {
    const filter = filters.find((f) => f.id === selectedFilter);
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
              <Button fullWidth radius="md" onClick={onClose}>
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
