import { describe, expect, it } from 'vitest'
import { isLikelySpam, isValidEmail, isValidPhone, normalizeContact, validateContact } from '../../shared/utils/contact'

const valid = { name: 'Clara', email: 'clara@empresa.com', phone: '+57 312 792 6312', company: '', role: '', need: '', website: '' }

describe('normalizeContact', () => {
  it('trims strings, lowercases the email and defaults the locale', () => {
    expect(normalizeContact({ name: '  Ana ', email: ' ANA@X.CO ', phone: 1234 })).toEqual({
      name: 'Ana', email: 'ana@x.co', phone: '', company: '', role: '', need: '', locale: 'es', website: ''
    })
  })

  it('keeps the english locale and survives non-object payloads', () => {
    expect(normalizeContact({ locale: 'en' }).locale).toBe('en')
    expect(normalizeContact(null).name).toBe('')
  })
})

describe('validateContact', () => {
  it('accepts a complete request with only the required fields', () => {
    expect(validateContact(valid)).toEqual([])
  })

  it('flags the three required fields', () => {
    expect(validateContact({}).map(e => `${e.field}:${e.code}`)).toEqual(['name:required', 'email:required', 'phone:required'])
  })

  it('rejects malformed email and phone', () => {
    const errors = validateContact({ ...valid, email: 'clara@', phone: '12-ab' })
    expect(errors).toEqual([{ field: 'email', code: 'invalidEmail' }, { field: 'phone', code: 'invalidPhone' }])
  })

  it('limits the length of free text', () => {
    expect(validateContact({ ...valid, need: 'x'.repeat(2001) })).toEqual([{ field: 'need', code: 'tooLong' }])
  })
})

describe('field helpers', () => {
  it.each([['a@b.co', true], ['a@b', false], ['a b@c.com', false]])('isValidEmail(%s) = %s', (email, expected) => {
    expect(isValidEmail(email)).toBe(expected)
  })

  it.each([['3127926312', true], ['(604) 444-1234', true], ['123456', false], ['+57 312 792 6312 99999', false]])('isValidPhone(%s) = %s', (phone, expected) => {
    expect(isValidPhone(phone)).toBe(expected)
  })

  it('treats a filled honeypot as spam', () => {
    expect(isLikelySpam({ website: 'http://spam' })).toBe(true)
    expect(isLikelySpam({ website: '' })).toBe(false)
  })
})
