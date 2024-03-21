import { env } from '@/lib/env'
import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Tailwind, Text } from '@react-email/components'

type Props = {
  confirmLink: string,
}

function VerificationEmail({confirmLink}: Props) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email.</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Img
              src={`${env.NEXT_PUBLIC_APP_URL}/logo.svg`}
              width={38}
              height={38}
              alt="Team Work"
            />
            <br />
            <Heading className='text-xl font-semibold'>🪄 Verify your email</Heading>
            <Section>
              <Text>Hello, 👋 .</Text>
              <Text>
                <Link href={confirmLink} className='text-color-cyan-soft'>
                  👉 Click here to verify your email👈
                </Link>
              </Text>
              <Text>
                If you {"didn't "}request this, please ignore this email.
              </Text>
            </Section>
            <Text>
              Best,
              <br />- Team Work
            </Text>
            <Hr />
            <Img
              src={`${env.NEXT_PUBLIC_APP_URL}/logo.svg`}
              width={32}
              height={32}
              style={{
                WebkitFilter: "grayscale(100%)",
                filter: "grayscale(100%)",
                margin: "20px 0",
              }}
            />
            <Text>Team Work Inc.</Text>
            <Text>
              { new Date().getFullYear()} Perú, Jhomudev
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default VerificationEmail