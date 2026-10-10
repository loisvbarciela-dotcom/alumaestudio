import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

export interface ContactNotificationProps {
  name?: string
  email?: string
  projectType?: string
  message?: string
  lang?: string
}

const labels: Record<string, { from: string; type: string; message: string }> = {
  gl: { from: 'De', type: 'Tipo de proxecto', message: 'Mensaxe' },
  es: { from: 'De', type: 'Tipo de proyecto', message: 'Mensaje' },
  en: { from: 'From', type: 'Project type', message: 'Message' },
}

function ContactNotification({
  name = 'Visitante',
  email = 'sen@correo.es',
  projectType = 'ficcion',
  message = '…',
  lang = 'gl',
}: ContactNotificationProps) {
  const l = labels[lang] ?? labels['gl']!
  return (
    <Html>
      <Head />
      <Preview>{`Nova consulta de ${name} — Aluma`}</Preview>
      <Body style={{ backgroundColor: '#16130F', margin: 0, padding: '32px 0' }}>
        <Container
          style={{
            backgroundColor: '#1E1A15',
            border: '1px solid #3A332A',
            borderRadius: '4px',
            margin: '0 auto',
            maxWidth: '560px',
            padding: '40px',
          }}
        >
          <Heading
            style={{
              color: '#F4F0E8',
              fontFamily: 'Georgia, serif',
              fontSize: '24px',
              fontWeight: 400,
              margin: '0 0 8px',
            }}
          >
            Aluma
          </Heading>
          <Text style={{ color: '#B08D4C', fontSize: '12px', letterSpacing: '2px', margin: '0 0 32px', textTransform: 'uppercase' }}>
            Nova consulta desde a web
          </Text>
          <Section>
            <Text style={{ color: '#8A8378', fontSize: '12px', margin: '0 0 4px', textTransform: 'uppercase' }}>
              {l.from}
            </Text>
            <Text style={{ color: '#F4F0E8', fontSize: '16px', margin: '0 0 20px' }}>
              {name} · {email}
            </Text>
            <Text style={{ color: '#8A8378', fontSize: '12px', margin: '0 0 4px', textTransform: 'uppercase' }}>
              {l.type}
            </Text>
            <Text style={{ color: '#F4F0E8', fontSize: '16px', margin: '0 0 20px' }}>
              {projectType}
            </Text>
            <Text style={{ color: '#8A8378', fontSize: '12px', margin: '0 0 4px', textTransform: 'uppercase' }}>
              {l.message}
            </Text>
            <Text style={{ color: '#F4F0E8', fontSize: '16px', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>
              {message}
            </Text>
          </Section>
          <Hr style={{ borderColor: '#3A332A', margin: '32px 0 16px' }} />
          <Text style={{ color: '#8A8378', fontSize: '12px', margin: 0 }}>
            Responde directamente a este correo para contestar a {name}.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ContactNotification,
  subject: (data: Record<string, any>) => `Nova consulta web: ${data['name'] ?? 'Visitante'}`,
  displayName: 'Aviso de consulta do formulario de contacto',
  to: 'alumagalicia@gmail.com',
  previewData: {
    name: 'María Piñeiro',
    email: 'maria@exemplo.com',
    projectType: 'Tu película personalizada',
    message: 'Ola! Casamos en xuño e gustaríanos unha película ambientada nos anos 20.',
    lang: 'gl',
  },
} satisfies TemplateEntry
