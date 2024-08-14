import formatDateStamp from "@/utils/formatDateStamp";

describe("formatDateStamp", () => {
  it("should return user friendly message when passed an empty string", () => {
    const dateStamp = "";
    const result = formatDateStamp(dateStamp);
    expect(result).toBe("Date unavailable, sorry!");
  });
  it("should return correct UK time format when passed a valid date", () => {
    const dateStamp = "2024-06-20T10:02:00.000Z";
    const expectedResult = "Thursday 20 June 2024";
    const result = formatDateStamp(dateStamp);
    expect(result).toBe(expectedResult);
  });
  it("should return correct UK time format when passed different valid date", () => {
    const dateStamp = "1999-12-31T23:59:59.000Z";
    const expectedResult = "Friday 31 December 1999";
    const result = formatDateStamp(dateStamp);
    expect(result).toBe(expectedResult);
  });
  it("should return user friendly message when passed an INVAVLID MONTH", () => {
    const dateStamp = "2024-13-20T12:00:00.000Z";
    const result = formatDateStamp(dateStamp);
    expect(result).toBe("Invalid Date");
  });
  it("should return user friendly message when passed an INVALID DAY", () => {
    const dateStamp = "2024-06-32T12:00:00.000Z";
    const result = formatDateStamp(dateStamp);
    expect(result).toBe("Invalid Date");
  });
  it("should return user friendly message when passed an INVALID HOUR", () => {
    const dateStamp = "2024-06-20T25:00:00.000Z";
    const result = formatDateStamp(dateStamp);
    expect(result).toBe("Invalid Date");
  });
  it("should return user friendly message when passed an INVALID MINUTE", () => {
    const dateStamp = "2024-06-20T12:61:00.000Z";
    const result = formatDateStamp(dateStamp);
    expect(result).toBe("Invalid Date");
  });
  it("should not mutate input object", () => {
    const dateStamp = "0001-01-01T00:00:00Z";
    const dateStampCopy = "0001-01-01T00:00:00Z";
    formatDateStamp(dateStamp);
    expect(dateStamp).toEqual(dateStampCopy);
  });
});
