import type { Schema, Struct } from '@strapi/strapi';

export interface InfoBloqueTexto extends Struct.ComponentSchema {
  collectionName: 'components_info_bloque_textos';
  info: {
    displayName: 'Bloque-texto';
  };
  attributes: {
    cuerpo: Schema.Attribute.Text;
  };
}

export interface InfoSeccionDestacada extends Struct.ComponentSchema {
  collectionName: 'components_info_seccion_destacadas';
  info: {
    displayName: 'Seccion-destacada';
  };
  attributes: {
    descripcion: Schema.Attribute.Text;
    imagen: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    titulo: Schema.Attribute.String;
  };
}

export interface InfoTarjetaInformativa extends Struct.ComponentSchema {
  collectionName: 'components_info_tarjeta_informativas';
  info: {
    displayName: 'Tarjeta-Informativa';
  };
  attributes: {
    imagen: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    titulo: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'info.bloque-texto': InfoBloqueTexto;
      'info.seccion-destacada': InfoSeccionDestacada;
      'info.tarjeta-informativa': InfoTarjetaInformativa;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
