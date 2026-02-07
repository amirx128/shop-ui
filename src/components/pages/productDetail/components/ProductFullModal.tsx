'use client';

import { Box, Container, Typography, Modal, Divider } from '@mui/material';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

interface Feature {
  title: string;
  value: string;
}

interface ProductFullModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content?: string;
  contentHtml?: string;
  features?: Feature[];
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export default function ProductFullModal({
  open,
  onClose,
  title,
  content,
  contentHtml,
  features,
  footer,
  children,
}: ProductFullModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100vh',
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: 'background.default',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Container>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                py: 2,
              }}
            >
              <ArrowRightAltOutlinedIcon
                onClick={onClose}
                sx={{ cursor: 'pointer' }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                }}
              >
                {title}
              </Typography>
            </Box>
          </Container>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
          }}
        >
          <Container>
            <Box
              sx={{
                py: 2,
              }}
            >
              {contentHtml ? (
                <Box
                  component="div"
                  sx={{
                    lineHeight: 1.8,
                  }}
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              ) : (
                content && (
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {content}
                  </Typography>
                )
              )}

              {features && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  {features.map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 120,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: '8px',
                          padding: 2,
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            textAlign: 'center',
                          }}
                        >
                          {feature.title}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: '8px',
                          padding: 2,
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'text.secondary',
                          }}
                        >
                          {feature.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

              {children}
            </Box>
          </Container>
        </Box>

        {footer && (
          <Box
            sx={{
              position: 'sticky',
              bottom: 0,
              zIndex: 1000,
              backgroundColor: 'background.default',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Container>
              <Box
                sx={{
                  py: 2,
                }}
              >
                {footer}
              </Box>
            </Container>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
