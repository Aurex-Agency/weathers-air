import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from '@/pages/Contact';
import { seasonalPosts } from '@/data/seasonal-posts';
import { coreServices } from '@/data/core-services';
import { trackCallIntent } from '@/lib/analytics';

afterEach(() => { vi.restoreAllMocks(); Reflect.deleteProperty(window, 'gtag'); });
const fill = () => {
 fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test Customer' } });
 fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '6625551234' } });
};
describe('October release', () => {
 it('ships four complete guides with resolvable core service destinations', () => {
   expect(seasonalPosts).toHaveLength(4);
   for (const p of seasonalPosts) {
     expect((p.intro+' '+p.sections.map(s=>s.paragraphs.join(' ')).join(' ')).split(/\s+/).length).toBeGreaterThan(400);
     expect(p.sources.length).toBeGreaterThan(0);
     expect(p.service.includes('#') || coreServices.some(s=>`/services/${s.slug}`===p.service)).toBe(true);
   }
 });
 it('prefills known service choices', () => {
   render(<MemoryRouter initialEntries={['/contact?service=maintenance']}><Contact/></MemoryRouter>);
   expect(screen.getByLabelText(/Service Type/i)).toHaveValue('Maintenance Plan');
 });
 it('records one accepted lead and blocks concurrent submissions', async () => {
   const event = vi.fn(); Object.assign(window, { gtag: event });
   let accept!: (r: Response) => void;
   const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(()=>new Promise(resolve=>{accept=resolve;}));
   render(<MemoryRouter><Contact/></MemoryRouter>); fill();
   const form = screen.getByRole('button', {name:/Send My Request/i}).closest('form')!;
   fireEvent.submit(form); fireEvent.submit(form);
   expect(fetchMock).toHaveBeenCalledTimes(1); expect(event).not.toHaveBeenCalled();
   accept(new Response('{"success":true}', {status:200}));
   expect(await screen.findByText(/Thank You!/)).toBeInTheDocument();
   expect(event.mock.calls).toEqual([['event','generate_lead',{form_name:'service_request'}]]);
 });
 it('does not count a failed request and permits retry', async () => {
   const event=vi.fn(); Object.assign(window,{gtag:event});
   const fetchMock=vi.spyOn(globalThis,'fetch').mockResolvedValueOnce(new Response('{"success":false}',{status:500})).mockResolvedValueOnce(new Response('{"success":true}',{status:200}));
   render(<MemoryRouter><Contact/></MemoryRouter>); fill();
   fireEvent.click(screen.getByRole('button',{name:/Send My Request/i}));
   expect(await screen.findByRole('alert')).toBeInTheDocument(); expect(event).not.toHaveBeenCalled();
   fireEvent.click(screen.getByRole('button',{name:/Send My Request/i}));
   expect(await screen.findByText(/Thank You!/)).toBeInTheDocument();
   expect(fetchMock).toHaveBeenCalledTimes(2); expect(event).toHaveBeenCalledTimes(1);
 });
 it('distinguishes phone intent from a delivered lead', () => {
   const event=vi.fn();Object.assign(window,{gtag:event});trackCallIntent();
   expect(event).toHaveBeenCalledWith('event','click_to_call',{interaction_type:'intent'});
 });
});
