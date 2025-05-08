export function getLicensePlates(length: number): string[] {
  const licensePlates: string[] = []

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const bothChars = alphabet + numbers

  for (let i = 0; i < length; i++) {
    let plate = ''

    for (let i = 0; i < 2; i++) {
      plate += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    }

    plate += '-'
    plate += bothChars.charAt(Math.floor(Math.random() * bothChars.length))

    for (let i = 0; i < 2; i++) {
      plate += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }

    licensePlates.push(plate)
  }

  return licensePlates
}

export function getNationalIds(): string[] {
  const nationalIds = [
    '0511921519',
    '0511931589',
    '0502961489',
    '0506621449',
    '0506651439',
    '0508811569',
    '0508821449',
    '0508821529',
    '0507611429',
    ...(process.env.TEST_NATIONAL_IDS?.split(',') ?? []),
  ]
  return nationalIds
}

export const incomeDescriptions = [
  'Norðurljós Software ehf',
  'Mús & Merki ehf.',
  'Knús&Knús og Koss&Koss ehf.',
  'Suðurpóll ehf.',
  'Andvana ehf.',
  'Orio ehf.',
  'Ballerina ehf.',
  'Pizza 67 ehf.',
  'Sælgætisverksmiðjan ehf.',
  'Strætó ehf.',
  'Microsoft ehf.',
  'Smiðjustofan ehf.',
  'Mainframe ehf.',
  'Smákaup ehf.',
  'Sölufélag ehf.',
  'webshop.is ehf.',
  'Gull og grænt ehf.',
  'Ljósblind ehf.',
  'Sólskin ehf.',
  'Grænland ehf.',
  'Gulur rauður ehf.',
  'Hringur ehf.',
  'Rúnturinn ehf.',
  'Tan Tan Tan ehf.',
  'Sunny Life ehf.',
  'Elephant plus ehf.',
]

export const otherDebtDescriptions = [
  'Eftirstöðvar á korti númer: 4469 88XX XXXX 4567',
  'Aukalán',
  '0142-26-732645 Varðan',
  'Kílómetragjald, Skatturinn',
  'Þing- og sveitarsjóðsgjöld, Skatturinn',
  'LÍN skuldabréf nr. G-542678',
  'LÍN skuldabréf nr. G-485076',
  'LÍN skuldabréf nr. G-259877',
  'LÍN skuldabréf nr. G-330574',
  'LÍN skuldabréf nr. G-858841',
  'ÚTLÁNS-REIKNINGUR 0142 26 800123',
  'ÚTLÁNS-REIKNINGUR 0123 26 003389',
  'ÚTLÁNS-REIKNINGUR 0123 26 010099',
  'Þing- og sveitarsjóðsgjöld, Sýslumaðurinn í Keflavík',
  'Bílasamningar: SBB 017460X',
  'Bílasamningar: SBB 027440X',
  'Bílasamningar: SBB 053460X',
]
