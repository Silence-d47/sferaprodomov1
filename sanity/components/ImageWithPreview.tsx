import { useClient } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { ObjectInputProps } from 'sanity';
import { useMemo } from 'react';
import { Card, Flex, Stack, Text, Box } from '@sanity/ui';

const PREVIEWS = [
  { label: 'Desktop', ratio: '16:9', width: 320, height: 180 },
  { label: 'Tablet', ratio: '4:3', width: 240, height: 180 },
  { label: 'Mobil', ratio: '1:1', width: 180, height: 180 },
];

export function ImageWithPreview(props: ObjectInputProps) {
  const client = useClient({ apiVersion: '2026-03-05' });
  const builder = useMemo(() => imageUrlBuilder(client), [client]);

  const value = props.value as
    | {
        asset?: { _ref?: string };
        crop?: { top: number; bottom: number; left: number; right: number };
        hotspot?: { x: number; y: number; width: number; height: number };
      }
    | undefined;

  const hasAsset = Boolean(value?.asset?._ref);

  return (
    <Stack space={4}>
      {props.renderDefault(props)}

      {hasAsset && (
        <Card padding={4} radius={2} shadow={1} tone="transparent">
          <Stack space={3}>
            <Text size={1} weight="semibold" muted>
              Náhled ořezu na různých zařízeních
            </Text>
            <Flex gap={3} wrap="wrap">
              {PREVIEWS.map((p) => (
                <Card key={p.label} radius={2} overflow="hidden" style={{ flex: '0 0 auto' }}>
                  <Stack space={2}>
                    <Box
                      style={{
                        width: p.width,
                        height: p.height,
                        overflow: 'hidden',
                        borderRadius: 4,
                        background: '#f3f3f3',
                      }}
                    >
                      <img
                        src={builder
                          .image(value!)
                          .width(p.width * 2)
                          .height(p.height * 2)
                          .fit('crop')
                          .auto('format')
                          .url()}
                        alt={p.label}
                        style={{
                          width: p.width,
                          height: p.height,
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </Box>
                    <Flex gap={1} align="center" justify="center" paddingBottom={1}>
                      <Text size={0} muted>
                        {p.label}
                      </Text>
                      <Text size={0} muted style={{ opacity: 0.5 }}>
                        {p.ratio}
                      </Text>
                    </Flex>
                  </Stack>
                </Card>
              ))}
            </Flex>
            <Text size={0} muted style={{ opacity: 0.6 }}>
              Nastavte ohnisko (hotspot) kliknutím na obrázek. Náhledy se aktualizují automaticky.
            </Text>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
