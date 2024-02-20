import ProcessorWrapper from './ProcessorWrapper';
import BackgroundTransformer, {
  BackgroundOptions,
  SegmenterOptions,
} from './transformers/BackgroundTransformer';

export * from './transformers/types';
export { default as VideoTransformer } from './transformers/VideoTransformer';
export { ProcessorWrapper, type BackgroundOptions, type SegmenterOptions, BackgroundTransformer };

export const BackgroundBlur = (
  blurRadius: number = 10,
  segmenterOptions?: SegmenterOptions,
  wasmFilesetUrl?: string,
  modelAssetPath?: string,
) => {
  return BackgroundProcessor(
    { blurRadius, segmenterOptions, wasmFilesetUrl, modelAssetPath },
    'background-blur',
  );
};

export const VirtualBackground = (
  imagePath: string,
  segmenterOptions?: SegmenterOptions,
  wasmFilesetUrl?: string,
  modelAssetPath?: string,
) => {
  return BackgroundProcessor(
    { imagePath, segmenterOptions, wasmFilesetUrl, modelAssetPath },
    'virtual-background',
  );
};

export const BackgroundProcessor = (options: BackgroundOptions, name = 'background-processor') => {
  const isProcessorSupported = ProcessorWrapper.isSupported && BackgroundTransformer.isSupported;
  if (!isProcessorSupported) {
    throw new Error('processor is not supported in this browser');
  }
  const processor = new ProcessorWrapper(new BackgroundTransformer(options), name);
  return processor;
};
