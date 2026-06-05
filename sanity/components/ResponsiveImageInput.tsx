import { useClient, type ObjectInputProps, set } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';
import ReactCrop, { type PercentCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useState, useMemo, useCallback } from 'react';
import { Card, Flex, Stack, Text, Tab, TabList, Box, Button, Badge } from '@sanity/ui';
import { CheckmarkCircleIcon, ResetIcon } from '@sanity/icons';

export interface CropConfig {
  key: string;
  label: string;
  ratio: string;
  aspect: number;
}

interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageValue {
  asset?: { _ref?: string };
  deviceCrops?: Record<string, CropData>;
}

function parseDimensions(ref: string): { width: number; height: number } | null {
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (!match) {
    return null;
  }
  return { width: parseInt(match[1]), height: parseInt(match[2]) };
}

function getDefaultCrop(aspect: number, imgWidth: number, imgHeight: number): PercentCrop {
  const imgAspect = imgWidth / imgHeight;

  // Try filling 90% width, calculate height from that
  let cropW = 90;
  let cropH = (cropW * imgAspect) / aspect;

  // If height overflows, constrain by height instead
  if (cropH > 90) {
    cropH = 90;
    cropW = (cropH * aspect) / imgAspect;
  }

  return {
    x: (100 - cropW) / 2,
    y: (100 - cropH) / 2,
    width: cropW,
    height: cropH,
    unit: '%',
  };
}

function savedToCrop(
  saved: CropData | undefined,
  aspect: number,
  imgWidth: number,
  imgHeight: number,
): PercentCrop {
  if (saved && saved.width > 0) {
    return { x: saved.x, y: saved.y, width: saved.width, height: saved.height, unit: '%' };
  }
  return getDefaultCrop(aspect, imgWidth, imgHeight);
}

/**
 * Factory: creates a ResponsiveImageInput configured with specific crop ratios.
 *
 * Usage in schema:
 *   components: { input: createResponsiveImageInput(REFERENCE_IMAGE_CROPS) }
 */
export function createResponsiveImageInput(configs: CropConfig[]) {
  return function ConfiguredResponsiveImageInput(props: ObjectInputProps) {
    return <ResponsiveImageInputInner {...props} configs={configs} />;
  };
}

function ResponsiveImageInputInner(props: ObjectInputProps & { configs: CropConfig[] }) {
  const { value, onChange, renderDefault, configs } = props;
  const client = useClient({ apiVersion: '2026-03-05' });
  const builder = useMemo(() => imageUrlBuilder(client), [client]);

  const [activeTab, setActiveTab] = useState(configs[0].key);
  const [pendingCrops, setPendingCrops] = useState<Record<string, PercentCrop>>({});
  const [savedIndicator, setSavedIndicator] = useState<Record<string, boolean>>({});

  const imageValue = value as ImageValue | undefined;
  const assetRef = imageValue?.asset?._ref;
  const hasAsset = Boolean(assetRef);

  // Raw image URL, no Sanity crop/hotspot applied
  const rawImageUrl = hasAsset ? builder.image(assetRef!).width(1200).auto('format').url() : null;

  const originalDims = assetRef ? parseDimensions(assetRef) : null;

  const hasPendingChange = (key: string) => Boolean(pendingCrops[key]);
  const isSaved = (key: string) => Boolean(savedIndicator[key]);

  const handleCropChange = useCallback(
    (key: string, _pixelCrop: unknown, percentCrop: PercentCrop) => {
      setPendingCrops((prev) => ({ ...prev, [key]: percentCrop }));
      setSavedIndicator((prev) => ({ ...prev, [key]: false }));
    },
    [],
  );

  const handleSave = useCallback(
    (key: string) => {
      const crop = pendingCrops[key];
      if (!crop) {
        return;
      }

      const cropData: CropData = {
        x: Math.round(crop.x * 100) / 100,
        y: Math.round(crop.y * 100) / 100,
        width: Math.round(crop.width * 100) / 100,
        height: Math.round(crop.height * 100) / 100,
      };
      const current = (imageValue?.deviceCrops || {}) as Record<string, CropData>;
      onChange(set({ ...current, [key]: cropData }, ['deviceCrops']));
      setPendingCrops((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setSavedIndicator((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setSavedIndicator((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    },
    [pendingCrops, onChange, imageValue],
  );

  const handleReset = useCallback(
    (key: string) => {
      const config = configs.find((c) => c.key === key)!;
      const w = originalDims?.width || 1200;
      const h = originalDims?.height || 800;
      setPendingCrops((prev) => ({ ...prev, [key]: getDefaultCrop(config.aspect, w, h) }));
      setSavedIndicator((prev) => ({ ...prev, [key]: false }));
    },
    [configs, originalDims],
  );

  const getCurrentCrop = useCallback(
    (key: string): PercentCrop => {
      if (pendingCrops[key]) {
        return pendingCrops[key];
      }
      const config = configs.find((c) => c.key === key)!;
      const w = originalDims?.width || 1200;
      const h = originalDims?.height || 800;
      return savedToCrop(imageValue?.deviceCrops?.[key], config.aspect, w, h);
    },
    [pendingCrops, imageValue, configs, originalDims],
  );

  const getPreviewUrl = useCallback(
    (key: string, previewWidth: number) => {
      if (!assetRef || !originalDims) {
        return null;
      }

      const saved = imageValue?.deviceCrops?.[key];
      if (!saved || saved.width <= 0) {
        return null;
      }

      const left = Math.round((originalDims.width * saved.x) / 100);
      const top = Math.round((originalDims.height * saved.y) / 100);
      const width = Math.round((originalDims.width * saved.width) / 100);
      const height = Math.round((originalDims.height * saved.height) / 100);

      return builder
        .image(assetRef)
        .rect(left, top, width, height)
        .width(previewWidth)
        .auto('format')
        .url();
    },
    [assetRef, originalDims, imageValue, builder],
  );

  return (
    <Stack space={4}>
      {renderDefault(props)}

      {hasAsset && rawImageUrl && (
        <Card padding={4} radius={2} shadow={1} tone="transparent">
          <Stack space={4}>
            <Text size={1} weight="semibold">
              Ořez podle použití na webu
            </Text>

            <TabList space={1}>
              {configs.map((config) => (
                <Tab
                  key={config.key}
                  id={`crop-${config.key}`}
                  label={`${config.label} (${config.ratio})`}
                  aria-controls={`panel-${config.key}`}
                  selected={activeTab === config.key}
                  onClick={() => setActiveTab(config.key)}
                />
              ))}
            </TabList>

            {configs.map((config) => {
              if (activeTab !== config.key) {
                return null;
              }
              const crop = getCurrentCrop(config.key);
              const pending = hasPendingChange(config.key);
              const saved = isSaved(config.key);
              const hasSavedCrop = Boolean(
                imageValue?.deviceCrops?.[config.key]?.width &&
                imageValue.deviceCrops![config.key].width > 0,
              );

              return (
                <Box key={config.key} id={`panel-${config.key}`}>
                  <Stack space={3}>
                    <div style={{ maxWidth: 600 }}>
                      <ReactCrop
                        crop={crop}
                        onChange={(px, pct) => handleCropChange(config.key, px, pct)}
                        aspect={config.aspect}
                        minWidth={30}
                        minHeight={30}
                      >
                        <img
                          src={rawImageUrl}
                          alt="Crop editor"
                          style={{ maxWidth: '100%', display: 'block' }}
                          crossOrigin="anonymous"
                        />
                      </ReactCrop>
                    </div>

                    <Flex gap={2} align="center">
                      <Button
                        text="Uložit ořez"
                        icon={CheckmarkCircleIcon}
                        tone="positive"
                        onClick={() => handleSave(config.key)}
                        disabled={!pending}
                      />
                      <Button
                        text="Resetovat"
                        icon={ResetIcon}
                        mode="ghost"
                        onClick={() => handleReset(config.key)}
                      />
                      {saved && (
                        <Badge tone="positive" fontSize={1} padding={2}>
                          Ořez uložen
                        </Badge>
                      )}
                      {pending && !saved && (
                        <Text size={1} muted>
                          Neuložené změny
                        </Text>
                      )}
                      {!pending && !saved && hasSavedCrop && (
                        <Badge tone="primary" fontSize={1} padding={2}>
                          Ořez nastaven
                        </Badge>
                      )}
                    </Flex>
                  </Stack>
                </Box>
              );
            })}

            {/* Saved crop previews */}
            <Stack space={3}>
              <Text size={0} weight="semibold" muted>
                Uložené ořezy
              </Text>
              <Flex gap={3} wrap="wrap">
                {configs.map((config) => {
                  const previewUrl = getPreviewUrl(config.key, 400);
                  const hasCrop = Boolean(
                    imageValue?.deviceCrops?.[config.key]?.width &&
                    imageValue.deviceCrops![config.key].width > 0,
                  );
                  const previewW = 180;
                  const previewH = Math.round(previewW / config.aspect);

                  return (
                    <Card
                      key={config.key}
                      radius={2}
                      overflow="hidden"
                      style={{ flex: '0 0 auto' }}
                    >
                      <Stack space={2}>
                        <Box
                          style={{
                            width: previewW,
                            height: previewH,
                            overflow: 'hidden',
                            borderRadius: 4,
                            background: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {previewUrl && hasCrop ? (
                            <img
                              src={previewUrl}
                              alt={config.label}
                              style={{
                                width: previewW,
                                height: previewH,
                                objectFit: 'cover',
                                display: 'block',
                              }}
                            />
                          ) : (
                            <Text size={0} muted>
                              Nenastaveno
                            </Text>
                          )}
                        </Box>
                        <Flex gap={1} align="center" justify="center" paddingBottom={1}>
                          <Text size={0} muted>
                            {config.label}
                          </Text>
                          <Text size={0} muted style={{ opacity: 0.5 }}>
                            {config.ratio}
                          </Text>
                        </Flex>
                      </Stack>
                    </Card>
                  );
                })}
              </Flex>
            </Stack>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
