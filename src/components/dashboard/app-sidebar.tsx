"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { allCountryCatalogs, religionsAcrossAllCountries } from "@/domain/countries/catalog-for-country";
import { educationBandOptions, maritalStatusOptions } from "@/domain/countries/shared-profile-options";
import { browseFiltersToSearchParams } from "@/domain/profile/parse-browse-search-params";
import { centimetersFromFeetAndInches, formatHeightFromCentimeters } from "@/domain/display/format-height";
import { formatIncomeAmount } from "@/domain/display/format-income";
import type { CountryCatalog, SupportedCountryCode } from "@/domain/countries/supported-countries";
import type { ProfileSearchFilters } from "@/db/types";

type FilterFormValues = {
  country: string;
  gender: "all" | "male" | "female";
  ageRange: [number, number];
  incomeRange: [number, number];
  heightRange: [number, number];
  city: string;
  religions: string[];
  educationBands: string[];
  maritalStatuses: string[];
};

export function AppSidebar({
  viewerCatalog,
  initialFilters,
}: {
  viewerCatalog: CountryCatalog;
  initialFilters: ProfileSearchFilters;
}) {
  const router = useRouter();
  const { setOpen } = useSidebar();
  const religions = useMemo(() => religionsAcrossAllCountries(), []);

  const defaultHeight: [number, number] = [
    initialFilters.heightMinCm ?? 140,
    initialFilters.heightMaxCm ?? 200,
  ];

  const form = useForm<FilterFormValues>({
    defaultValues: {
      country: initialFilters.country ?? "all",
      gender: initialFilters.gender ?? "all",
      ageRange: [initialFilters.ageMin ?? 21, initialFilters.ageMax ?? 40],
      incomeRange: [initialFilters.incomeMin ?? 0, initialFilters.incomeMax ?? viewerCatalog.incomeSliderMax],
      heightRange: defaultHeight,
      city: initialFilters.city ?? "",
      religions: initialFilters.religions ?? [],
      educationBands: initialFilters.educationBands ?? [],
      maritalStatuses: initialFilters.maritalStatuses ?? [],
    },
  });

  function applyFilters(values: FilterFormValues) {
    const params = browseFiltersToSearchParams({
      country: values.country as SupportedCountryCode | "all",
      gender: values.gender,
      ageMin: values.ageRange[0],
      ageMax: values.ageRange[1],
      incomeMin: values.incomeRange[0],
      incomeMax: values.incomeRange[1],
      heightMinCm: values.heightRange[0],
      heightMaxCm: values.heightRange[1],
      city: values.city,
      religions: values.religions,
      educationBands: values.educationBands,
      maritalStatuses: values.maritalStatuses,
    });
    router.push(`/profiles?${params.toString()}`);
    setOpen(false);
  }

  const incomeRange = form.watch("incomeRange");
  const heightRange = form.watch("heightRange");
  const ageRange = form.watch("ageRange");

  return (
    <form onSubmit={form.handleSubmit(applyFilters)}>
      <Sidebar>
        <SidebarHeader className="flex flex-row items-center justify-between gap-4 px-4 py-4 md:pt-16">
          <h4 className="text-2xl font-semibold text-primary">Filters</h4>
          <Button variant="destructive" type="button" className="w-auto cursor-pointer" onClick={() => setOpen(false)}>
            <X />
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Country</SidebarGroupLabel>
            <SidebarGroupContent>
              <RadioGroup
                value={form.watch("country")}
                onValueChange={(value) => form.setValue("country", value)}
                className="space-y-2"
              >
                <RadioRow id="country-all" value="all" label="All countries" />
                {allCountryCatalogs().map((item) => (
                  <RadioRow key={item.code} id={`country-${item.code}`} value={item.code} label={item.englishName} />
                ))}
              </RadioGroup>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Gender</SidebarGroupLabel>
            <SidebarGroupContent>
              <RadioGroup
                value={form.watch("gender")}
                onValueChange={(value) => form.setValue("gender", value as FilterFormValues["gender"])}
                className="space-y-2"
              >
                <RadioRow id="gender-all" value="all" label="All" />
                <RadioRow id="gender-male" value="male" label="Men" />
                <RadioRow id="gender-female" value="female" label="Women" />
              </RadioGroup>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Age</SidebarGroupLabel>
            <SidebarGroupContent className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>{ageRange[0]}</span>
                <span>{ageRange[1]}</span>
              </div>
              <Slider
                min={18}
                max={70}
                step={1}
                value={ageRange}
                onValueChange={(value) => form.setValue("ageRange", value as [number, number])}
              />
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Income ({viewerCatalog.currency}, used when one country is selected)</SidebarGroupLabel>
            <SidebarGroupContent className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>{formatIncomeAmount(incomeRange[0], viewerCatalog.currency)}</span>
                <span>{formatIncomeAmount(incomeRange[1], viewerCatalog.currency)}</span>
              </div>
              <Slider
                min={0}
                max={viewerCatalog.incomeSliderMax}
                step={viewerCatalog.incomeSliderStep}
                value={incomeRange}
                onValueChange={(value) => form.setValue("incomeRange", value as [number, number])}
              />
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Height</SidebarGroupLabel>
            <SidebarGroupContent className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>{formatHeightFromCentimeters(heightRange[0], viewerCatalog.heightDisplayUnit)}</span>
                <span>{formatHeightFromCentimeters(heightRange[1], viewerCatalog.heightDisplayUnit)}</span>
              </div>
              <Slider
                min={140}
                max={210}
                step={viewerCatalog.heightDisplayUnit === "centimeters" ? 1 : centimetersFromFeetAndInches(0, 1)}
                value={heightRange}
                onValueChange={(value) => form.setValue("heightRange", value as [number, number])}
              />
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>City</SidebarGroupLabel>
            <SidebarGroupContent>
              <Input placeholder="Mumbai, Berlin, Austin…" {...form.register("city")} />
            </SidebarGroupContent>
          </SidebarGroup>

          <CheckboxList
            title="Religion"
            options={religions}
            selected={form.watch("religions")}
            onChange={(next) => form.setValue("religions", next)}
          />
          <CheckboxList
            title="Education"
            options={educationBandOptions}
            selected={form.watch("educationBands")}
            onChange={(next) => form.setValue("educationBands", next)}
          />
          <CheckboxList
            title="Marital status"
            options={maritalStatusOptions}
            selected={form.watch("maritalStatuses")}
            onChange={(next) => form.setValue("maritalStatuses", next)}
          />
        </SidebarContent>
        <SidebarFooter>
          <Button type="button" variant="outline" onClick={() => router.push("/profiles")}>
            Reset
          </Button>
          <Button type="submit">Apply filters</Button>
        </SidebarFooter>
      </Sidebar>
    </form>
  );
}

function RadioRow({ id, value, label }: { id: string; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <RadioGroupItem value={value} id={id} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}

function CheckboxList({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: readonly { value: string; label: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent className="space-y-2">
        {options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`${title}-${option.value}`}
                checked={checked}
                onCheckedChange={(isChecked) => {
                  const next = new Set(selected);
                  if (isChecked) {
                    next.add(option.value);
                  } else {
                    next.delete(option.value);
                  }
                  onChange(Array.from(next));
                }}
              />
              <Label htmlFor={`${title}-${option.value}`}>{option.label}</Label>
            </div>
          );
        })}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
