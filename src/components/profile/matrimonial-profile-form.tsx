"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { saveMyMatrimonialProfile } from "@/app/actions/save-my-matrimonial-profile";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { catalogForCountry, allCountryCatalogs } from "@/domain/countries/catalog-for-country";
import { indiaMotherTongueOptions } from "@/domain/countries/india";
import {
  dietOptions,
  educationBandOptions,
  familyTypeOptions,
  genderOptions,
  habitOptions,
  hasChildrenOptions,
  manglikOptions,
  maritalStatusOptions,
  photoVisibilityOptions,
  wantsChildrenOptions,
} from "@/domain/countries/shared-profile-options";
import { unitedStatesEthnicityOptions } from "@/domain/countries/united-states";
import {
  matrimonialProfileFormSchema,
  type MatrimonialProfileFormValues,
} from "@/domain/profile/matrimonial-profile-form-schema";
import { feetAndInchesFromCentimeters, centimetersFromFeetAndInches } from "@/domain/display/format-height";

const steps = [
  { id: 1, title: "Country" },
  { id: 2, title: "Basics" },
  { id: 3, title: "About you" },
  { id: 4, title: "Preferences & privacy" },
] as const;

export function MatrimonialProfileForm({
  defaultValues,
  submitLabel,
  redirectTo,
}: {
  defaultValues: MatrimonialProfileFormValues;
  submitLabel: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const form = useForm<MatrimonialProfileFormValues>({
    resolver: zodResolver(matrimonialProfileFormSchema),
    defaultValues,
  });

  const country = form.watch("country");
  const catalog = useMemo(() => catalogForCountry(country), [country]);
  const heightUnit = catalog.heightDisplayUnit;
  const heightCm = form.watch("heightCm");
  const feetInches = feetAndInchesFromCentimeters(heightCm);

  async function onSubmit(values: MatrimonialProfileFormValues) {
    const result = await saveMyMatrimonialProfile(values);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Profile saved.");
    if (redirectTo) {
      router.push(redirectTo);
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full max-w-3xl space-y-8">
        <ol className="flex flex-wrap gap-2 text-sm">
          {steps.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`rounded-full px-3 py-1 ${step === item.id ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                onClick={() => setStep(item.id)}
              >
                {item.id}. {item.title}
              </button>
            </li>
          ))}
        </ol>

        {step === 1 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Where do you live?</h2>
            <p className="text-muted-foreground">
              This picks currency, height units, and optional fields. You can still browse people in
              other countries later.
            </p>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allCountryCatalogs().map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.englishName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Income will be saved in {catalog.currency}. Height is shown in{" "}
                    {heightUnit === "centimeters" ? "centimeters" : "feet and inches"}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        )}

        {step === 2 && (
          <section className="grid gap-4 md:grid-cols-2">
            <h2 className="text-2xl font-semibold md:col-span-2">The basics other members see</h2>
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on your profile</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>We show your age, never this date, on cards.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>I am a</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seekingGender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Looking for a</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {heightUnit === "centimeters" ? (
              <FormField
                control={form.control}
                name="heightCm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    min={4}
                    max={8}
                    value={feetInches.feet}
                    onChange={(event) =>
                      form.setValue(
                        "heightCm",
                        centimetersFromFeetAndInches(Number(event.target.value), feetInches.inches),
                      )
                    }
                  />
                  <Input
                    type="number"
                    min={0}
                    max={11}
                    value={feetInches.inches}
                    onChange={(event) =>
                      form.setValue(
                        "heightCm",
                        centimetersFromFeetAndInches(feetInches.feet, Number(event.target.value)),
                      )
                    }
                  />
                </div>
                <FormDescription>Feet and inches. Stored as centimeters.</FormDescription>
              </FormItem>
            )}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select
                    value={catalog.cities.some((item) => item.city === field.value) ? field.value : "__other"}
                    onValueChange={(value) => {
                      if (value === "__other") {
                        field.onChange("");
                        return;
                      }
                      const match = catalog.cities.find((item) => item.city === value);
                      field.onChange(value);
                      if (match) {
                        form.setValue("region", match.region);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {catalog.cities.map((item) => (
                        <SelectItem key={`${item.city}-${item.region}`} value={item.city}>
                          {item.city}
                        </SelectItem>
                      ))}
                      <SelectItem value="__other">Other city</SelectItem>
                    </SelectContent>
                  </Select>
                  {!catalog.cities.some((item) => item.city === field.value) && (
                    <Input className="mt-2" placeholder="Type your city" {...field} />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State / region</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Religion</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {catalog.religions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="educationBand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education level (for filters)</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {educationBandOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree or qualification</FormLabel>
                  <FormControl>
                    <Input placeholder="MBA, B.Tech, Staatsexamen…" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="annualIncomeAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yearly income ({catalog.currencySymbol})</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Stored in {catalog.currency}. You can hide this later.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maritalStatusOptions.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        )}

        {step === 3 && (
          <section className="grid gap-4 md:grid-cols-2">
            <h2 className="text-2xl font-semibold md:col-span-2">Lifestyle and a short introduction</h2>
            <FormField
              control={form.control}
              name="aboutMe"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>About you</FormLabel>
                  <FormControl>
                    <Textarea rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diet"
              render={({ field }) => (
                <SelectField label="Diet" field={field} options={dietOptions} />
              )}
            />
            <FormField
              control={form.control}
              name="smoking"
              render={({ field }) => (
                <SelectField label="Smoking" field={field} options={habitOptions} />
              )}
            />
            <FormField
              control={form.control}
              name="drinking"
              render={({ field }) => (
                <SelectField label="Drinking" field={field} options={habitOptions} />
              )}
            />
            <FormField
              control={form.control}
              name="hasChildren"
              render={({ field }) => (
                <SelectField label="Children" field={field} options={hasChildrenOptions} />
              )}
            />
            <FormField
              control={form.control}
              name="wantsChildren"
              render={({ field }) => (
                <SelectField label="Want children?" field={field} options={wantsChildrenOptions} />
              )}
            />
            <FormField
              control={form.control}
              name="languagesSpoken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Languages you speak</FormLabel>
                  <FormControl>
                    <Input placeholder="English, Hindi, German" {...field} />
                  </FormControl>
                  <FormDescription>Separate languages with commas.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {catalog.extraFields.motherTongue && (
              <FormField
                control={form.control}
                name="motherTongue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mother tongue</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {indiaMotherTongueOptions.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {catalog.extraFields.familyType && (
              <FormField
                control={form.control}
                name="familyType"
                render={({ field }) => (
                  <SelectField label="Family type" field={field} options={familyTypeOptions} />
                )}
              />
            )}
            {catalog.extraFields.community && (
              <FormField
                control={form.control}
                name="community"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Community (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Never required. Leave blank if you prefer.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {catalog.extraFields.manglik && (
              <FormField
                control={form.control}
                name="isManglik"
                render={({ field }) => (
                  <SelectField label="Manglik (optional)" field={field} options={manglikOptions} />
                )}
              />
            )}
            {catalog.extraFields.onlyChild && (
              <FormField
                control={form.control}
                name="isOnlyChild"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(Boolean(checked))} />
                    </FormControl>
                    <FormLabel>I am an only child</FormLabel>
                  </FormItem>
                )}
              />
            )}
            {catalog.extraFields.ethnicity && (
              <FormField
                control={form.control}
                name="ethnicity"
                render={({ field }) => (
                  <SelectField label="Ethnicity (optional)" field={field} options={unitedStatesEthnicityOptions} />
                )}
              />
            )}
          </section>
        )}

        {step === 4 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Partner preferences and privacy</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="prefMinAge"
                render={({ field }) => (
                  <NumberField label="Preferred age from" field={field} />
                )}
              />
              <FormField
                control={form.control}
                name="prefMaxAge"
                render={({ field }) => (
                  <NumberField label="Preferred age to" field={field} />
                )}
              />
              <FormField
                control={form.control}
                name="prefMinHeightCm"
                render={({ field }) => (
                  <NumberField label="Preferred height from (cm)" field={field} />
                )}
              />
              <FormField
                control={form.control}
                name="prefMaxHeightCm"
                render={({ field }) => (
                  <NumberField label="Preferred height to (cm)" field={field} />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="photosVisibleTo"
              render={({ field }) => (
                <SelectField label="Who can see my photo" field={field} options={photoVisibilityOptions} />
              )}
            />
            <FormField
              control={form.control}
              name="hideIncome"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(Boolean(checked))} />
                  </FormControl>
                  <FormLabel>Hide my income on my public profile</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="acceptedPrivacyTerms"
              render={({ field }) => (
                <FormItem className="flex items-start gap-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(Boolean(checked))} />
                  </FormControl>
                  <div>
                    <FormLabel>I agree to the privacy policy</FormLabel>
                    <FormDescription>
                      {catalog.extraFields.requirePrivacyConsent
                        ? "Required for members in Germany before we create your profile."
                        : "You can export or delete your data later from Settings."}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </section>
        )}

        <div className="flex justify-between gap-4">
          <Button type="button" variant="outline" disabled={step === 1} onClick={() => setStep((current) => current - 1)}>
            Back
          </Button>
          {step < 4 ? (
            <Button type="button" onClick={() => setStep((current) => current + 1)}>
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving…" : submitLabel}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

function SelectField({
  label,
  field,
  options,
}: {
  label: string;
  field: { value?: string; onChange: (value: string) => void };
  options: readonly { value: string; label: string }[];
}) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select value={field.value} onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
}

function NumberField({
  label,
  field,
}: {
  label: string;
  field: { value: number; onChange: (value: number) => void };
}) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input type="number" value={field.value} onChange={(event) => field.onChange(Number(event.target.value))} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
